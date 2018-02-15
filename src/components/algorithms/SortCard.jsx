import React from 'react';

class SortCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { highCards, value, swapping } = this.props;

    let cName = (highCards.includes(value) ? 'highCard' : 'regCard');
    cName = (swapping && cName === 'highCard' ? 'swapCard' : cName);

    return (
      <div className={`sortCard-container ${cName}`}>
        <h2>{value}</h2>

      </div>

    );
  }
}

export default SortCard;
