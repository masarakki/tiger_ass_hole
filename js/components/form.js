import React from 'react';
import { RadioGroup, Radio } from 'react-radio-group';

class TextField extends React.Component {

  render () {
    const onChange = () => this.props.onChange(this.props.name, this.refs.field.value);
    return (
      <div className='form-group'>
        <label htmlFor={this.props.key} className='col-md-2 control-label'>
          {this.props.title}
        </label>
        <div className='col-md-10'>
          <input ref='field'
                 type='text'
                 placeholder={this.props.title}
                 className='form-control'
                 onChange={onChange}
                 />
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', circle: '', released_at: '', direction: 'rtl' };
    this.onChange = this.onChange.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
  }

  onChange(key, value) {
    this.setState({[key]: value});
  }

  changeDirection(direction) {
    this.setState({direction});
  }

  createEpub(e) {
    if (this.state.title === '') {
      return false;
    }
    if (this.state.circle === '') {
      return false;
    }
    if (this.state.released_at === '') {
      return false;
    }
    return this.props.create(this.state);
  }

  deleteFiles(e) {
    if (confirm('Are You sure?')) {
      this.props.delete();
    }
  }

  render () {
    const createEpub = this.createEpub.bind(this);
    const deleteFiles = this.deleteFiles.bind(this);

    return (
      <div>
        <h2>Attributes</h2>
        <form className='form form-horizontal' onSubmit={() => false}>
          <TextField title='Title' name='title' value={this.state.title} onChange={this.onChange} />
          <TextField title='Circle' name='circle' value={this.state.circle} onChange={this.onChange} />
          <TextField title='Released' name='released_at' value={this.state.released_at} onChange={this.onChange} />
          <div className='form-group'>
            <label htmlFor={this.props.key} className='col-md-2 control-label'>
              Direction
            </label>
            <div className='col-md-10 radio'>
              <RadioGroup name='direction' selectedValue={this.state.direction} onChange={this.changeDirection}>
                <div className='radio'>
                  <label>
                    <Radio value='rtl' />
                    Right to Left
                  </label>
                </div>
                <div className='radio'>
                  <label>
                    <Radio value='ltr' />
                    Left to Right
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
        <button className='btn btn-success col-md-offset-2' onClick={createEpub}>Create EPUB</button>
        <button className='btn btn-danger col-md-offset-2' onClick={deleteFiles}>Delete</button>
      </div>
    );
  }
}

export default Form;
