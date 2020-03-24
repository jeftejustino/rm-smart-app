import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-native';
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
  Item,
  ItemText,
} from './styles';

export default function MultiSelect({
  defaultValue,
  defaultLabel,
  onValueChange,
  options,
  ...rest
}) {
  const [label, setLabel] = useState();
  const [values, setValues] = useState(defaultValue);
  const [qtd, setQtd] = useState(defaultValue.length);
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSelected(item) {
    const dv = defaultValue;
    if (dv.includes(item.value)) {
      const index = dv.indexOf(item.value);
      dv.splice(index, 1);
    } else {
      dv.push(item.value);
    }
    setQtd(dv.length);
    setValues(dv);
    onValueChange(dv);
  }

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
            <ModalOptions>
              {options.length ? (
                <Options
                  ListHeaderComponent={() => <></>}
                  data={options}
                  keyExtractor={item => String(item.value)}
                  renderItem={({item}) => (
                    <Item
                      active={values && values.includes(item.value)}
                      onPress={() => {
                        handleSelected(item);
                      }}>
                      <ItemText>{item.label}</ItemText>
                    </Item>
                  )}
                />
              ) : (
                <NotFound>Não há itens correspondentes</NotFound>
              )}
            </ModalOptions>

            <CloseModal onPress={() => handleCloseModal()}>
              <CloseModalText>OK</CloseModalText>
            </CloseModal>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

MultiSelect.propTypes = {
  options: PropTypes.array,
  onValueChange: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string,
  defaultValue: PropTypes.array,
};

MultiSelect.defaultProps = {
  defaultLabel: '',
  defaultValue: [],
  options: [],
};
