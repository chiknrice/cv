import React from 'react';
import { Typography } from '@material-ui/core';

const Ul = ({ lines, ...rest }) => (
  <ul>
    {lines.split(/[\r\n]+/).map((line, index) => (
      <li key={index}>
        <RichTextElement element={line} {...rest} />
      </li>
    ))}
  </ul>
);

const RichTextElement = ({ element, ...rest }) => {
  if (typeof element === 'string') {
    return <Typography {...rest}>{element}</Typography>;
  } else {
    switch (element.type) {
      case 'ul':
        return <Ul lines={element.text} {...rest} />;
      default:
        throw Error(`Unknown rich text type ${element.type}`);
    }
  }
};

const RichTextArray = ({ array, ...rest }) =>
  array.map((element, index) => (
    <RichTextElement key={index} element={element} {...rest} />
  ));

export const RichText = ({ text, ...rest }) =>
  Array.isArray(text) ? (
    <RichTextArray array={text} {...rest} />
  ) : (
    <RichTextElement element={text} {...rest} />
  );
