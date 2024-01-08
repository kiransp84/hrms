import React , {useState} from 'react';
import { Formik, Form } from 'formik';
import {
    RecoilRoot
  } from 'recoil';
import MyTextField from '../../components/common/html/MyTextField';
import MyButton from '../../components/common/html/MyButton';
import { calculateActual } from './formulas';
import DetailsContainer from './components/containers/DetailsContainer';

const initialValuesDef = {
    actualBasicPay: '',
    actualDA: ''
}

const GenerateSalary = () => {
    return <RecoilRoot><DetailsContainer /></RecoilRoot>
}

const GenerateSalaryTest = () => {

    const [actualBasicPay,setActualBasicPay] = useState(0);

    console.log(actualBasicPay);

    const calculate = () => {
        setActualBasicPay(calculateActual(3100,10,'DEC',2023));
    }

    const initialValues = {
        ...initialValuesDef,
        ...{actualBasicPay}
    }



    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
            }}
        >
            <Form>

                <MyTextField
                    label="actualBasicPay"
                    name="actualBasicPay"
                    type="number"
                    placeholder=""
                    title=""
                />

                <MyTextField
                    label="actualDA"
                    name="actualDA"
                    type="number"
                    placeholder=""
                    title=""
                />

                <MyButton type="button" label="Calculate" onClick={calculate} />

            </Form>
        </Formik>
    );

            
            }
            
export default GenerateSalary;