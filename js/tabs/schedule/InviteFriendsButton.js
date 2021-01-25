'use strict';

import React from 'react';
import F8Button from '../../common/F8Button';

class InviteFriendsButton extends React.Component {
  props: {
    style: any,
  };

  render() {
    return (
      <F8Button
        theme="bordered"
        fontSize={13}
        opacity={0.6}
        caption="Invite friends to the F8 app"
      />
    );
  }
}

module.exports = InviteFriendsButton;
