import React from 'react';
import PropTypes from 'prop-types';
import {
  ItemHeader,
  ItemName,
  ItemContent,
  ItemRank,
  ItemRankText,
  ItemConversions,
  ItemConversionsTitle,
  ItemConversionsValue,
  ItemUpdated,
  ItemUpdatedTitle,
  ItemUpdatedValue,
  ItemResponsible,
  ItemResponsibleTitle,
  ItemResponsibleValue,
} from './styles';

export default function PeopleListItem({item}) {
  return (
    <>
      <ItemHeader>
        <ItemName>{item.name || item.email}</ItemName>
      </ItemHeader>

      <ItemContent>
        <ItemRank rankColor={item.rankColor}>
          <ItemRankText rankColor={item.rankColor}>{item.rank}</ItemRankText>
        </ItemRank>

        <ItemConversions>
          <ItemConversionsTitle>Conversões</ItemConversionsTitle>
          <ItemConversionsValue>{item.conversions}</ItemConversionsValue>
        </ItemConversions>

        <ItemUpdated>
          <ItemUpdatedTitle>Atualizado</ItemUpdatedTitle>
          <ItemUpdatedValue>{item.updated_at_formatted}</ItemUpdatedValue>
        </ItemUpdated>

        <ItemResponsible>
          <ItemResponsibleTitle>Dono do Lead</ItemResponsibleTitle>
          <ItemResponsibleValue>{item.responsible}</ItemResponsibleValue>
        </ItemResponsible>
      </ItemContent>
    </>
  );
}

PeopleListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
