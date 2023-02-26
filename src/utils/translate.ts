const { Translate } = require('@google-cloud/translate').v2;

export const translateText = async (text: string, target: string = 'en') => {
  const translate = new Translate();
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('translate: ' + translations);
  return translations[0];
};

export const detectLanguage = async (text: string) => {
  const translate = new Translate();
  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  console.log('detections: ' + detections);
  return detections[0].language;
};
