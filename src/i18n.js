export const getI18n = (i18n) => {
  const envLang = process.env.SAIHUBOT_LANG
  if (i18n[envLang]) {
      return i18n[envLang];
  }
  return i18n['en'];
}

export const t = (str, args) => {
  if (!args.i18n.props || args.i18n.props.length === 0) {
      console.log('i18n.props is not defined');
  }
  const msg = getI18n(args.i18n)[str];
  const props = args.i18n.props;
  return msg
    ? props.reduce(
        (prev, cur) => prev.replace(`{{${cur}}}`, args[cur]), msg)
    : str;
}
