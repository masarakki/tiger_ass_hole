import React from 'react';

class Image extends React.Component {

  render() {
    const src = `/images/${this.props.src}`;

    return (
      <img {...this.props} src={src} />
    );
  }
}

export default Image;
