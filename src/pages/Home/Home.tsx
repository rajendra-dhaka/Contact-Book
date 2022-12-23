import {IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import './Home.scss';
import { personAddOutline } from "ionicons/icons";
import { ContactItem, Header } from '../../components';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';


const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      // argument 1
      collection(db, 'people'),
      // argument 2
      (snapshot) => {
        let list: any = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPeople(list);
        setLoading(false);
      },
      // argument 3
      (error) => {
        console.log(error);
      }
    );


    return () => {
      unsub();
    }

  }, []);

  return (
    <IonPage >
    
<Header backbutton={false}/>

      <IonContent fullscreen>
        <IonItem>
          <IonSearchbar />
          <Link to='/upsert'>
          <IonButton>
              <IonIcon icon={personAddOutline} color='tertiary' className='font25'/>
          </IonButton>
            </Link>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol className='contact-list ion-margin'>
              <ContactItem people={ people} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
