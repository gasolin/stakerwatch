'use strict';
import {t} from 'saihubot-cli-adapter/dist/i18n';

/**
 * Delegate the QRCode rendering via `npx saihu qrcode [text]` command
 */
export const skillQRCode = {
  name: 'qrcode',
  help: 'qrcode [text] - Generate QRCode with [text]',
  rule: /^qrcode (.*)/i,
  requirements: {
    adapters: ['cli'],
    addons: ['exec'],
  },
  i18n: {
    'en': {
      loading: 'generating QRCode via saihu qrcode...',
    },
    'zh_TW': {
      loading: '呼叫 saihu qrcode 命令產生 QRCode...',
    },
  },
  action: function(robot, msg) {
    robot.send(t('loading', {i18n: this.i18n}));
    robot.render();
    robot.addons.exec('npx', ['saihu', 'qrcode', msg[1]]);
  },
};


/**
 * Delegate the Address Check via
 * `npx ethereum-checksum-address [addr] --check` command
 */
export const skillCheck = {
  name: 'check',
  help: 'check [address] - check if [address] is valid',
  rule: /^check (.*)/i,
  requirements: {
    adapters: ['cli'],
    addons: ['exec'],
  },
  i18n: {
    'en': {
      loading: 'Check if address is valid...',
      lowercase: 'true (without checksum)',
      fail: 'false (incorrect format)',
    },
    'zh_TW': {
      loading: '確認是否為正確地址格式...',
      lowercase: 'True (無 checksum)',
      fail: 'false (格式不正確)',
    },
  },
  action: function(robot, msg) {
    robot.send(t('loading', {i18n: this.i18n}));
    robot.render();
    const addr = msg[1];
    if (addr && addr.startsWith('0x') && addr.length === 42) {
      if (addr.toLowerCase() === addr) {
        robot.send(t('lowercase', {i18n: this.i18n}));
        robot.render();
      } else {
        robot.addons.exec(
            'npx', ['ethereum-checksum-address', addr, '--check']);
      }
    } else {
      robot.send(t('fail', {i18n: this.i18n}));
    }
  },
};

const skills = [skillQRCode, skillCheck];
export {skills};
