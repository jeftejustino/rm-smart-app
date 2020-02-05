import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {SingOut} from '~/store/modules/auth/actions';

export default function SingOutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SingOut());
  });

  return <View />;
}
