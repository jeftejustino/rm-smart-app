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
} from './styles';

import api from '~/services/api';

export default function SelectAjax({defaultValue, defaultLabel, url, ...rest}) {
  const [value, setValue] = useState(defaultValue);
  const [label, setLabel] = useState(defaultLabel);
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [showModal, setShowModal] = useState(true);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSelected() {}

  async function searchQuery() {
    try {
      const response = await api.post(url, {name: query});
      setOptions(response.data);
    } catch (error) {}
  }

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
                  data={options}
                  keyExtractor={item => String(item.id)}
                  renderItem={({item, index}) => (
                    <Item
                      onPress={() => {
                        handleSelected(item);
                      }}>
                      <ItemText>{item.name}</ItemText>
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
  options: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  defaultLabel: PropTypes.string,
  defaultValue: PropTypes.string,
};

SelectAjax.defaultProps = {
  defaultLabel: '',
  defaultValue: 0,
};
