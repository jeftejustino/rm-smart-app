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
} from './styles';

import api from '~/services/api';

export default function SelectAjax({
  defaultValue,
  defaultLabel,
  onValueChange,
  url,
  ...rest
}) {
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
    setLabel(item.name || item.email);
    onValueChange(item.id);
    setShowModal(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
              {options.length ? (
                <Options
                  ListHeaderComponent={() => (
                    <>{loading && <ActivityIndicator />}</>
                  )}
                  data={options}
                  keyExtractor={item => String(item.id)}
                  renderItem={({item}) => (
                    <Item
                      onPress={() => {
                        handleSelected(item);
                      }}>
                      <ItemText>{item.name || item.email}</ItemText>
                    </Item>
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

SelectAjax.propTypes = {
  url: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string,
  defaultValue: PropTypes.string,
};

SelectAjax.defaultProps = {
  defaultLabel: '',
  defaultValue: 0,
};
