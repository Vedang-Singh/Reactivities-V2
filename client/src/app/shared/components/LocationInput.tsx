import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {Box, debounce, List, ListItemButton, TextField, Typography} from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
    label: string;
} & UseControllerProps<T>

function LocationInput<T extends FieldValues>(props: Props<T>) {

    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || "");

    useEffect(() => {
        if (field.value && typeof field.value === "object") setInputValue(field.value.venue || '');
        else setInputValue(field.value || '');
    }, [field.value]);

    const apiKey = import.meta.env.VITE_API_LIQ;

    const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&limit=5&dedupe=1&`;
    
    const fetchSuggestions = useMemo(
        () => debounce(async (query) => {
            if (!query || query.length <= 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
                setSuggestions(res.data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        }, 500), [locationUrl]
    )

    const handleChange = async (value: string) => {
        field.onChange(value);  // Notify react-hook-form that the field's value has changed to the new "value"
        await fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village;
        const venue = location.display_name;
        const latitude = location.lat;
        const longitude = location.lon;

        setInputValue(venue);
        field.onChange({city, venue, latitude, longitude});
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue}
                onChange={e => handleChange(e.target.value)}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />
            {loading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 && (
                <List sx={{border: 1}}>
                    {suggestions.map(suggestions =>
                        <ListItemButton
                            divider
                            key={suggestions.place_id}
                            onClick={() => handleSelect(suggestions)}
                        >
                            {suggestions.display_name}
                        </ListItemButton>
                    )}
                </List>
            )}
        </Box>
    );
}

export default LocationInput;