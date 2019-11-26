import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonCard, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Dogs} from '../models/dog';
import './Tab2.css';

const Tab2: React.FC = () => {

    const [hasError, setErrors] = useState(false);

    const [dogsEven, setDogsEven] = useState<string[]>([]);
    const [dogsOdd, setDogsOdd] = useState<string[]>([]);

    async function fetchData() {
        const res: Response = await fetch('https://dog.ceo/api/breeds/image/random/50');
        res
            .json()
            .then((res) => {
                const dogs: Dogs = res;

                if (dogs && dogs.message && dogs.message.length > 0) {
                    setDogsEven([...dogsEven, ...dogs.message.filter((_a, i) => i % 2)]);
                    setDogsOdd([...dogsOdd, ...dogs.message.filter((_a, i) => !(i % 2))]);
                }
            })
            .catch(err => setErrors(err));
    }

    useEffect( () => {
        fetchData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-uppercase">So much doggos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="doggos-container">
                    {renderDogs()}
                </div>
            </IonContent>
        </IonPage>
    );

    function renderDogs() {
        if (hasError) {
            return undefined;
        }

        if ((!dogsEven || dogsEven.length <= 0) && (!dogsOdd || dogsOdd.length <= 0)) {
            return undefined;
        }

        return <div className="dogs-container">
            <div className="dogs-column">
                {renderDogsColumn(dogsOdd)}
            </div>
            <div className="dogs-column">
                {renderDogsColumn(dogsEven)}
            </div>
        </div>;
    }

    function renderDogsColumn(dogs: string[]) {
        if (!dogs || dogs.length <= 0) {
            return undefined;
        }

        return dogs.map((dogImgUrl: string, i: number) => {
            return <IonCard key={i}>
                <img src={dogImgUrl} alt={`A random dog with index ${i}`}/>
            </IonCard>
        });
    }
};

export default Tab2;
