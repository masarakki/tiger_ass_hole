import React from 'react';
import Image from './image';

class SelectedImages extends React.Component {
  render () {
    const imageWidth = 64;
    const imageMargin = 3;
    const images = this.props.images.map((file, index) => {
      const key = `selected_${index}`;
      const styles = {
        width: `${imageWidth}px`,
        padding: `${imageMargin}px`
      };
      if (this.props.selected == index) {
        styles.backgroundColor = '#eecccc';
      }

      return (
        <Image src={file} style={styles} key={key} onClick={() => this.props.onClick(index)}/>
      );
    });

    const wrapperStyles = {
      width: '100%',
      overflowX: 'scroll'
    };
    const styles = {
      width: this.props.images.length * (imageWidth + 2 * imageMargin) + 'px'
    };

    return (
      <div style={wrapperStyles}>
        <div style={styles}>
          {images}
        </div>
      </div>
    );
  }
}

export default SelectedImages;
