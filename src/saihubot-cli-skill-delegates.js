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
    en: {
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
  }
};

const skills = [skillQRCode];
export { skills };
