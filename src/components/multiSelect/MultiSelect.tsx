import { withJsonFormsControlProps } from '@jsonforms/react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { FC } from 'react';

interface IMultiSelect {
  handleChange: (p: any,v: string[]) => void;
  path: any;
  schema: any;
}

const MultiSelect: FC<IMultiSelect> = ({ handleChange, path, schema }) => {
  const options = schema?.enum || [];
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const onChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      typeof value === 'string' ? value.split(',') : value,
    );
    handleChange(path, typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Pays</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={onChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {options?.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
            <Checkbox checked={selectedValues?.indexOf(option) > -1} />
              <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withJsonFormsControlProps(MultiSelect);
