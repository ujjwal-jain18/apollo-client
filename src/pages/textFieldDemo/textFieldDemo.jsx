import React from 'react';

import { TextField, Slider } from '../../components/index';

import { Banners } from '../../configs/constants';

import { Div } from '../../components/textField/style';

function Demo() {
  return (
    <>
      <div>
        <Slider
          alt='no image'
          duration='1000'
          height='300'
          random
          banner={Banners}
        />
      </div>
      <Div>
        <TextField
          arg='Disabled input'
          input='This is a Disabled input'
          dis='disabled'
        />
        <TextField arg='Accessible' input='A Valid Input' />
        <TextField
          arg='101'
          input='An Input With Errors'
          error='could not be more than'
        />
      </Div>
    </>
  );
}

export default Demo;
