import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal, ActivityIndicator} from 'react-native';
import {
  Container,
  Label,
  OpenModal,
  CloseModal,
  CloseModalText,
  ModalContainer,
  ModalContent,
  ModalOptions,
  Options,
  NotFound,
  InputSearch,
  Item,
  ItemText,
  Selected,
} from './styles';

import api from '~/services/api';

export default function MultiSelectAjax({
  defaultValue,
  defaultLabel,
  onValueChange,
  url,
  ...rest
}) {
  const [values, setValues] = useState([]);
  const [qtd, setQtd] = useState();
  const [label, setLabel] = useState();
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSelected(item) {
    const dv = defaultValue;
    const index = dv.findIndex(i => i.id === item.id);

    if (index !== -1) {
      dv.splice(index, 1);
    } else {
      dv.push(item);
    }

    setQtd(dv.length);
    setValues(dv);
    onValueChange(dv);
  }

  async function searchQuery() {
    setLoading(true);
    try {
      const response = await api.post(url, {nome: query});
      setOptions(response.data);
    } catch (error) {
      // error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onValueChange(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLabel(defaultLabel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLabel]);

  useEffect(() => {
    searchQuery();
    console.tron.log(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (values.length) {
      if (values.length === 1) setLabel(`${values.length} item Selecionado`);
      else setLabel(`${values.length} itens Selecionados`);
    } else setLabel(defaultLabel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qtd]);

  return (
    <Container>
      <OpenModal onPress={() => handleOpenModal()}>
        <Label {...rest}>{label}</Label>
      </OpenModal>
      <Modal visible={showModal} transparent>
        <ModalContainer>
          <ModalContent>
            <InputSearch placeholder="Pesquisar..." onChangeText={setQuery} />
            <ModalOptions>
              <Selected
                data={values}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => (
                  <>
                    <Item
                      active
                      onPress={() => {
                        handleSelected(item);
                      }}>
                      <ItemText>{item.nome || item.name}</ItemText>
                    </Item>
                  </>
                )}
              />

              {options.length ? (
                <Options
                  ListHeaderComponent={() => (
                    <>{loading && <ActivityIndicator />}</>
                  )}
                  data={options}
                  keyExtractor={item => String(item.id)}
                  renderItem={({item}) => (
                    <>
                      {values.findIndex(i => i.id === item.id) === -1 && (
                        <Item
                          onPress={() => {
                            handleSelected(item);
                          }}>
                          <ItemText>{item.nome || item.name}</ItemText>
                        </Item>
                      )}
                    </>
                  )}
                />
              ) : (
                <NotFound>Não há itens correspondentes</NotFound>
              )}
            </ModalOptions>

            <CloseModal onPress={() => handleCloseModal()}>
              <CloseModalText>Fechar</CloseModalText>
            </CloseModal>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

MultiSelectAjax.propTypes = {
  url: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

MultiSelectAjax.defaultProps = {
  defaultLabel: '',
  defaultValue: [],
};
