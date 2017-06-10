/**
 * Created by bromanelli on 12/10/2016.
 */
import React from 'react';
import { Text, Form } from '../app/components';
import { maptileCompleted } from '../../common/maptiles/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';

let NewMapTile = ({ maptileCompleted, fields, intl }) => {
  const onInputKeyDown = event => {
    maptileCompleted(fields.title.value);
  };

  return (
    <Form small>
      <Text
        onClick={onInputKeyDown}
      >Cliquer sur cette phrase pour mettre à jour firebase (maptiles/actions)</Text>
    </Form>
  );
};

NewMapTile.propTypes = {
  maptileCompleted: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

NewMapTile = fields(NewMapTile, {
  path: 'newMapTile',
  fields: ['title'],
});

NewMapTile = injectIntl(NewMapTile);

export default connect(null, { maptileCompleted })(NewMapTile);
