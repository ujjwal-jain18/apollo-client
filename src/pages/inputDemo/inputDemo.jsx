/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import * as yup from 'yup';

import {
  selectOptions,
  RadioOptionsFootball,
  RadioOptionsCricket,
} from '../../configs/constants';

import {
  TextField,
  SelectField,
  RadioGroup,
  ButtonField,
} from '../../components/index';

class InputDemo extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3),
    sport: yup.string().required('sport is required'),
    cricket: yup.string().when('sport', {
      is: 'cricket',
      then: yup.string().required('What you do is required'),
    }),
    football: yup.string().when('sport', {
      is: 'football',
      then: yup.string().required('What you do is required'),
    }),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  // eslint-disable-next-line consistent-return
  getError = (field) => {
    if (this.state.touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  };

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, () => console.log(this.state));
  };

  handleSportChange = (e) => {
    this.setState({ sport: e.target.value }, () => console.log(this.state));
    if (e.target.value === 'Select') {
      this.setState({ sport: '' });
    }
    if (e.target.value === 'cricket') {
      this.setState({ football: '' });
    } else if (e.target.value === 'football') {
      this.setState({ cricket: '' });
    } else {
      this.setState({ cricket: '', football: '' });
    }
  };

  handlePositionChange = (e) => {
    const { sport } = this.state;
    if (sport === 'cricket') {
      this.setState({ cricket: e.target.value }, () => console.log(this.state));
    } else if (sport === 'football') {
      this.setState({ football: e.target.value }, () =>
        console.log(this.state)
      );
    }
  };

  RadioOption = () => {
    let { radioValue } = this.state;
    const { sport } = this.state;
    if (sport === 'cricket') {
      radioValue = RadioOptionsCricket;
    } else if (sport === 'football') {
      radioValue = RadioOptionsFootball;
    }
    return radioValue;
  };

  render() {
    const { sport } = this.state;
    console.log(this.state);
    return (
      <>
        <TextField
          input='Name'
          error={this.getError('name')}
          onChange={this.handleNameChange}
          onBlur={() => this.isTouched('name')}
        />
        <SelectField
          input='Select the game you play ?'
          error={this.getError('sport')}
          onChange={this.handleSportChange}
          options={selectOptions}
          onBlur={() => this.isTouched('sport')}
        />
        <div>
          {sport === '' || sport === 'Select' ? (
            ''
          ) : (
            <RadioGroup
              input='What you do ?'
              error={this.getError(sport)}
              options={this.RadioOption()}
              onChange={this.handlePositionChange}
              onBlur={() => this.isTouched(sport)}
            />
          )}
        </div>
        <ButtonField value='cancel' />
        <ButtonField value='submit' disabled={this.hasErrors()} />
      </>
    );
  }
}
export default InputDemo;
