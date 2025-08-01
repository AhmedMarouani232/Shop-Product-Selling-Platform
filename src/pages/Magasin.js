import React, { useEffect, useState } from "react";
import ButtonField from "../components/Button";
import './css/Magasin.css';
import { useNavigate } from "react-router-dom";
import verifyAuth from "../components/VerifyAuth";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStore, linkVendor } from "../app/services/MagasinServices";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles'; // Use styled from @mui/material/styles
import { getDevisStats } from "../app/services/DevisServices";
import Swal from "sweetalert2";
import { setSelectedStoreToState } from "../app/reducers/magasinReducer";


// Styled component for the label
const Label = styled('label')(({ theme }) => ({
    color: 'var(--Text-100, #333)',
    fontFamily: 'Montserrat',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    letterSpacing: '0.32px',
    marginBottom: '8px',
}));

const StyledTextField = styled(TextField)({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '8px',
    backgroundColor: 'var(--Tertiary-10, rgba(199, 178, 153, 0.10))',
    width: '100%',
    color: 'var(--Text-60, rgba(51, 51, 51, 0.60))',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: '18.4px', // 115%
    letterSpacing: '0.32px',
    '& .MuiInputBase-input': {
        fontSize: '14px',
        fontFamily: 'Montserrat',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'var(--Text-60, rgba(51, 51, 51, 0.60))',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--Tertiary-100, #C7B299)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--Tertiary-100, #C7B299)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--Tertiary-100, #C7B299)',
        },
    },
    '& label': {
        fontSize: '16px',
        fontFamily: 'Montserrat',
        color: 'var(--Text-60, rgba(51, 51, 51, 0.60))',
        '&.Mui-focused': {
            color: 'var(--Tertiary-100, #C7B299)',
        },
    },
});

const Magasin = () => {
    const dispatch = useDispatch();
    const [selectedStore, setSelectedStore] = useState(null);
    const stores = useSelector((state) => state.Stores?.stores?.stores || []);
    const currentStore = useSelector((state) => state.Stores?.currentStore || []);

    useEffect(()=>{
        dispatch(getCurrentStore());
    },[dispatch]);

    useEffect(() => {
        // Set the initial value for selectedStore to currentStore when component mounts
        if (currentStore.store_name) {
            setSelectedStore({
                id: currentStore.store_id,
                label: `${currentStore.store_name} - ${currentStore.store_code}`,
                value: currentStore.store_code
            });
        }
    }, [currentStore]);

    const navigate = useNavigate();

    const submit = () => {
        if(!selectedStore){
            Swal.fire({
                title: "Attention",
                text: "Veillez selectionner un magasin.",
                icon: "warning",
                confirmButtonText: "OK",
              })
        }else{
            dispatch(linkVendor(selectedStore.id));
            dispatch(getDevisStats());
            navigate("/dashboard");
        }
    };

    const chosenStore = (event, newValue) => {
        setSelectedStore(newValue);
        dispatch(setSelectedStoreToState(newValue));
    };

    const options = stores.map((store) => ({
        id: store.store_id,
        label: `${store.store_name} - ${store.store_code}`,
        value: store.store_code
    }));

    const optionsGrouped = options.map((option) => {
        const firstLetter = option.label[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });

    return (
        <div className="magasin__page" style={{marginTop:"-14%"}}>
            <div className="magasin__icons">
                <img className="magasin__fnac" src="images/Darty.svg" alt="icon" />
            </div>
            <form style={{height:"17rem"}}>
                <Label>Dans quel magasin vous situez-vous ?</Label>
                <Autocomplete
                    disablePortal
                    value={selectedStore || null} // Control the value with selectedStore
                    options={optionsGrouped}
                    sx={{ width: 300 }}
                    onChange={chosenStore}
                    groupBy={(options) => options.firstLetter}
                    renderInput={(params) => <StyledTextField {...params} label="Code Magasin" />}
                />
                <div className="magasin__button">
                    <ButtonField onClick={submit} type="submit" id="confirmButton" variant="primary">
                        Valider
                    </ButtonField>
                </div>
            </form>
        </div>
    );
};

export default verifyAuth(Magasin);
