const { Translate } = require('@google-cloud/translate').v2;

export const translateText = async (text: string, target: string = 'en') => {
  const translate = new Translate();
  let [translations] = await translate.translate(text, target);
  const result = Array.isArray(translations) ? translations : [translations];
  console.log('translate: ' + result);
  return result[0];
};
