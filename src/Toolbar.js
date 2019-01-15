import React, { Component } from 'react'

class Toolbar extends Component {

  makeUnread = () => {
    if (this.props.countUnread() > 0) {
      return (
        <>
        <p className="pull-right">
          <span className="badge badge">{this.props.countUnread()}</span>
          unread messages
        </p>
        </>
      )
    }
  }


  render() {
    return ( <
      >
      <div className="row toolbar">
        <div className="col-md-12">

          <a className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>
          <button className="btn btn-default" onClick={this.props.toggleAllSelect} >
            <i className={`fa ${this.props.isSelected()? 'fa-minus-square-o' : 'fa-square-o'}`}></i>
          </button>
          {this.makeUnread()}

          <button className="btn btn-default">Mark As Read</button>

          <button className="btn btn-default">Mark As Unread</button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div> <
      />
    )
  }

}

export default Toolbar
