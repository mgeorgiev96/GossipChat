import React from 'react';
import IconButton from '@material-ui/core/IconButton';


function UploadIcon(props) {

  return (
    <div className='uploadIcon'>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
      />
      <input accept="image/*" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          {props.icon}
        </IconButton>
      </label>
    </div>
  );
}


export default UploadIcon;