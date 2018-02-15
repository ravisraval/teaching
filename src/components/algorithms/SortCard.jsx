import React from 'react';

class SortCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { highCards, value } = this.props;

    const cName = (highCards.includes(value) ? 'highCard' : 'regCard');

    return (
      <div className={`sortCard-container ${cName}`}>
        <h2>{value}</h2>

      </div>

    );
  }
}

export default SortCard;
