import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

/**
 * @description
 * @author Abhishek
 * @date 08/04/2021
 * @param checked:Boolean
 * @param onChange: g()
 */
const CustomCheckbox = ({checked, onChange, label, className, size}) => {
    return (
        <React.Fragment>
        <FormControlLabel
            control={
            <Checkbox
                checked={checked}
                onChange={onChange}
                size={size}
                name="checked"
                className={className || ''}
            />
            }
            label={label || "checkbox"}
        />
        </React.Fragment>
    );
}

export default CustomCheckbox