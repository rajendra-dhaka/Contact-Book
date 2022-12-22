import {IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import './Home.scss';
import { personAddOutline } from "ionicons/icons";
import { ContactItem, Header } from '../../components';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
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
              <ContactItem/>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
