import React from 'react';
import { render } from 'react-dom';
import ImageList from './components/image_list';
import SelectedImages from './components/selected_images';
import Image from './components/image';
import Form from './components/form';
import request from './request';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { images: [], range: 1, selected: 0, editable: true };
    this.fetchImages = this.fetchImages.bind(this);
    this.selectRange = this.selectRange.bind(this);
    this.showImage = this.showImage.bind(this);
    this.createEpub = this.createEpub.bind(this);
    this.deleteFIles = this.deleteFiles.bind(this);
  }

  selectRange(range)  {
     this.setState({range});
  }

  showImage(selected) {
    this.setState({selected});
  }

  createEpub(meta) {
    this.setState({editable: false});
    request({
      method: 'POST',
      url: '/epub',
      body: JSON.stringify({
        range: this.state.range,
        meta: meta
      }),
      format: 'json'
    }).then(this.fetchImages).then(() => {
      this.setState({editable: true, range: 1, selected: 0});
    });
  }

  deleteFiles() {
  }

  fetchImages() {
    return request({
      method: 'GET',
      uri: '/images',
      format: 'json'
    }).then(images => {
      this.setState({images});
    });
  }

  componentDidMount() {
    this.fetchImages();
  }

  devNull(e) {
    console.log(e);
  }

  render() {
    const styles = {
      width: '90%'
    };

    const cover = {
      display: this.state.editable ? 'none' : 'block'
    };

    return (
      <div>
        <div className='col-md-3'>
          <ImageList images={this.state.images} range={this.state.range} onClick={this.selectRange} />
        </div>
        <div className='col-md-9'>
          <SelectedImages images={this.state.images.slice(0, this.state.range)} selected={this.state.selected} onClick={this.showImage} />
          <div style={{marginTop: '20px'}}>
            <div className='col-md-6'>
              <Image src={this.state.images[this.state.selected]} style={styles} />
            </div>
            <div className='col-md-6'>
              <Form create={this.createEpub} delete={this.deleteFiles} editable={this.state.editable} />
            </div>
          </div>
        </div>
        <div id='cover' onClick={this.devNull} style={cover}>
          <p>Processing</p>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('main'));
