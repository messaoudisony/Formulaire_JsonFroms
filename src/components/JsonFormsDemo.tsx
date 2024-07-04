import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import continentsData from '../data/continents.json';
import schema from '../schema/schema.json';
import uischema from '../schema/uischema.json';
import MultiSelect from './multiSelect/MultiSelect';
import multiSelectTester from './multiSelect/multiSelectTester';

import {  JsonFormsRendererRegistryEntry } from '@jsonforms/core';


const classes = {
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
};

interface IData {
  nom: string;
  continent: string;
  pays: string[];
}

const initialData: IData = {
  nom: 'Sonia MESSAOUDI',
  continent: '',
  pays: []
};

const renderers : JsonFormsRendererRegistryEntry[]  = [
  ...materialRenderers,
  { tester: multiSelectTester, renderer: MultiSelect }
];

export const JsonFormsDemo: FC = () => {
  const [data, setData] = useState<IData>(initialData);
  const [schemaState, setSchemaState] = useState(schema);

  useEffect(() => {
    const selectedContinent = continentsData.continents.find(
      (continent) => continent?.nom === data?.continent
    );
    const updatedSchema = {
      ...schema,
      properties: {
        ...schema?.properties,
        pays: {
          ...schema?.properties.pays,
          items: {
            ...schema.properties.pays.items,
            enum: selectedContinent?.pays ?? [""],
          },
        },
      },
    };
    setSchemaState(updatedSchema);

    if (selectedContinent) {
      setData((prevData) => ({
        ...prevData,
        pays: selectedContinent?.pays,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        pays: [],
      }));
    }
  }, [data.continent]);

  const handleDataChange = ({ data }: {data: IData}) => {
    setData(data);
  };

  return (
    <Grid
      container
      justifyContent={'center'}
      spacing={1}
      style={classes.container}
    >
       <Grid item sm={12}>
        <Typography variant={'h4'}>Formulaire</Typography>
        <div style={classes.demoform}>
          <JsonForms
            schema={schemaState}
            uischema={uischema}
            data={data}
            renderers={renderers}
            cells={materialCells}
            onChange={handleDataChange}
          />
        </div>
      </Grid>
      <Grid item sm={12}>
        <Typography variant={'h4'}>Visualisation de data</Typography>
        <div style={classes.dataContent}>
          <pre id="boundData">{JSON.stringify(data, null, 1)}</pre>
        </div>
        <Button
          style={classes.resetButton}
          onClick={() => setData(initialData)}
          color="primary"
          variant="contained"
          data-testid="clear-data"
        >
          Clear data
        </Button>
      </Grid>
     
    </Grid>
  );
};
