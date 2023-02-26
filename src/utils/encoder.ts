import { encode } from 'gpt-3-encoder';

export const countTokens = (text: string) => {
  return encode(text).length;
};
