import React from 'react';
import Image from './image';

class Box extends React.Component {
  render() {
    const key = `image_${this.props.index}`;
    const boxStyles = {
      padding: '10px 10px 0 10px',
      textAlign: 'center'
    };
    const imageStyles={
      width: '90%'
    };

    if (this.props.selected) {
      boxStyles.backgroundColor = '#eecccc';
    };
    return (
      <div className='col-md-6' style={boxStyles} key={key}>
        <Image src={this.props.image} onClick={this.props.onClick} style={imageStyles} />
        <div>{this.props.index + 1}</div>
      </div>
    );
  }
}

class ImageList extends React.Component {
  render() {
    const items = this.props.images.map((image, index) => {
      const key = `image_${index}`;
      const clicked = () => this.props.onClick(index + 1);
      const selected = (index < this.props.range);

      return <Box image={image} index={index} onClick={clicked} selected={selected} />;
    });

    const styles = {
      height: window.innerHeight - 51,
      overflowY: 'scroll'
    };

    return (
      <div style={styles}>
        {items}
      </div>
    );
  }
}

ImageList.defaultProps = { images: [] };

export default ImageList;
