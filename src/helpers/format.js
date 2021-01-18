import { t } from 'saihubot-cli-adapter/dist/i18n';

import {i18nBalance} from '../i18n';

export const formatAddress = (address) => address && `${address.substring(0, 6)}..`;

export const formatRow = ({address, token, balance, source}) => ({
  [t('addr', {i18n: i18nBalance})]: formatAddress(address),
  [t('token', {i18n: i18nBalance})]: token,
  [t('balance', {i18n: i18nBalance})]: balance,
  [t('source', {i18n: i18nBalance})]: source,
});

export const formatData = (data) => data
  ? data.map(entry => formatRow(entry))
  : data;
