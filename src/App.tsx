import { Box, MenuItem, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { garbageCalcV2 } from "./damage";

const defaultData: Parameters<typeof garbageCalcV2>[0] = {
  lines: 0,
  b2b: 0,
  combo: 0,
  perfectClear: false,
  enemies: 0,
  piece: "T",
  spin: "none",
};

function InputGroup(props: {
  index: number;
  data: Parameters<typeof garbageCalcV2>[0];
  options: Parameters<typeof garbageCalcV2>[1];
  onChange: (value: Parameters<typeof garbageCalcV2>[0]) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {/* lines input (number) */}
      <TextField
        label="Lines"
        type="number"
        defaultValue={props.data.lines}
        onBlur={(e) =>
          props.onChange({
            ...props.data,
            lines: e.target.value.length ? parseInt(e.target.value) : props.data.lines,
          })
        }
        sx={{ marginRight: 2 }}
      />
      {/* spin type select (none/mini/normal) */}
      <TextField
        label="Spin"
        select
        value={props.data.spin}
        onChange={(e) =>
          props.onChange({
            ...props.data,
            spin: e.target.value as Parameters<typeof garbageCalcV2>[0]["spin"],
          })
        }
        sx={{ marginRight: 2 }}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="mini">Mini</MenuItem>
        <MenuItem value="normal">Normal</MenuItem>
      </TextField>
      {/* piece type */}
      <TextField
        label="Piece"
        select
        value={props.data.piece}
        onBlur={(e) =>
          props.onChange({
            ...props.data,
            piece: e.target.value as Parameters<typeof garbageCalcV2>[0]["piece"],
          })
        }
        sx={{ marginRight: 2 }}
      >
        <MenuItem value="T">T</MenuItem>
        <MenuItem value="J">J</MenuItem>
        <MenuItem value="Z">Z</MenuItem>
        <MenuItem value="O">O</MenuItem>
        <MenuItem value="S">S</MenuItem>
        <MenuItem value="L">L</MenuItem>
        <MenuItem value="I">I</MenuItem>
      </TextField>
      {/* b2b */}
      <TextField
        label="B2B"
        type="number"
        defaultValue={props.data.b2b}
        onBlur={(e) =>
          props.onChange({
            ...props.data,
            b2b: e.target.value.length ? parseInt(e.target.value) : props.data.b2b,
          })
        }
        sx={{ marginRight: 2 }}
      />
      {/* combo */}
      <TextField
        label="Combo"
        type="number"
        defaultValue={props.data.combo}
        onBlur={(e) =>
          props.onChange({
            ...props.data,
            combo: e.target.value.length ? parseInt(e.target.value) : props.data.combo,
          })
        }
        sx={{ marginRight: 2 }}
      />
      {/* perfect clear toggle */}
      <Typography>Perfect Clear</Typography>
      <Switch
        checked={props.data.perfectClear}
        onChange={(e) =>
          props.onChange({ ...props.data, perfectClear: e.target.checked })
        }
      />
      {/* enemies */}
      <TextField
        label="Enemies"
        type="number"
        defaultValue={props.data.enemies}
        onBlur={(e) =>
          props.onChange({
            ...props.data,
            enemies: e.target.value.length
              ? parseInt(e.target.value)
              : props.data.enemies,
          })
        }
        sx={{ marginRight: 2 }}
      />
    </Box>
  );
}
function App() {
  const [options, setOptions] = useState<Parameters<typeof garbageCalcV2>[1]>({
    b2bChaining: true,
    comboTable: "multiplier",
    garbageBlocking: "combo blocking",
    garbageMultiplier: 1,
    spinBonuses: "tspins",
    garbageAttackCap: Infinity,
    garbageTargetBonus: "none",
  });
  const [data, setData] = useState([defaultData]);

  return (
    <>
      <Box sx={{ margin: 10 }}>
        <h1>Tetr.io damage calculator</h1>
      </Box>

      {data.map((d, i) => (
        <InputGroup
          index={i}
          data={d}
					key={i}
          options={options}
          onChange={(value) => {
            const newData = [...data];
            newData[i] = value;
            setData(newData);
          }}
        />
      ))}

      {data.reduce((acc, d) => acc + garbageCalcV2(d, options).garbage, 0)} lines sent
			{data.reduce((acc, d) => acc + garbageCalcV2(d, options).bonus, 0)} garbage bonus for survial with enemies idk
    </>
  );
}

export default App;
