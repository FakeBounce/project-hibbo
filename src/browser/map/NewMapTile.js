/**
 * Created by bromanelli on 12/10/2016.
 */
import React from 'react';
import { Input, Form } from '../app/components';
import { maptileCompleted } from '../../common/maptiles/actions';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';

let NewMapTile = ({ maptileCompleted, fields, intl }) => {
  const onInputKeyDown = event => {
    if (event.key !== 'Enter') return;
    if (!fields.title.value.trim()) return;
    maptileCompleted(fields.title.value);
    fields.$reset();
  };

  return (
    <Form small>
      <Input
        {...fields.title}
        label=""
        maxLength={100}
        onKeyDown={onInputKeyDown}
      />
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
