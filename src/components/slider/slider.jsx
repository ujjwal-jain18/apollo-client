import React from 'react';

import PropTypes from 'prop-types';

import Img from './style';

import {
  PUBLIC_IMAGE_FOLDER,
  DEFAULT_BANNER_IMAGE,
  Total,
} from '../../configs/constants';

import { getNextRoundRobin, getRandomNumber } from '../../libs/utils/math';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: -1,
    };
  }

  componentDidMount() {
    const { random, duration } = this.props;
    let { current } = this.state;
    this.id = setInterval(() => {
      if (random) {
        current = getRandomNumber(Total);
      } else {
        current = getNextRoundRobin(current, Total);
      }
      this.setState({ current });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { current } = this.state;
    const { alttext, height, duration, banner } = this.props;
    const { defaultbanner } = this.props;
    if (current === -1 || banner.length === 0) {
      return (
        <>
          <div align='center'>
            <Img
              src={`${PUBLIC_IMAGE_FOLDER}${defaultbanner}`}
              alt={alttext}
              height={height}
              duration={duration}
            />
          </div>
        </>
      );
    }
    return (
      <>
        <div align='center'>
          <Img
            src={`${PUBLIC_IMAGE_FOLDER}${banner[current]}`}
            alt={alttext}
            height={height}
            duration={duration}
          />
        </div>
      </>
    );
  }
}
export default Slider;
Slider.propTypes = {
  alttext: PropTypes.string,
  banner: PropTypes.arrayOf(PropTypes.string),
  defaultbanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  alttext: 'defaultbanner',
  banner: [],
  defaultbanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};
