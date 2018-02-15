import React from 'react';

class SortCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log('im in a sortcard', this.props);
    return (
      <div className="sortCard-container">
        <h2>{this.props.value}</h2>

      </div>

    );
  }
}

export default SortCard;
