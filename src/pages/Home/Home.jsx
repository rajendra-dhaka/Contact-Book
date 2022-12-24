import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import './Home.scss';
import { personAddOutline } from 'ionicons/icons';
import { ContactItem, Header } from '../../components';
import { Link } from 'react-router-dom';
import { useContactData } from '../../Context/DataContext';

const Home = () => {
  const { filteredContactData, setFilteredContactData, contactData } = useContactData();

  const handlePersonSearch = (text) => {
    text = text.trim();
    console.log(text.length,'lnt');
    if (text.length > 0){
      const Searchresult = [...filteredContactData].filter((personData) => {
        return personData.name.toLowerCase().includes(text.toLowerCase())
      })
      setFilteredContactData(Searchresult)
    } else if (text.length === 0) {
      setFilteredContactData(contactData)
    }
    
}

  return (
    <IonPage>
      <Header backbutton={false} />

      <IonContent fullscreen>
        <IonItem>
          <IonSearchbar onIonChange={(e)=>handlePersonSearch(e.target.value)}/>
          <Link to='/upsert'>
            <IonButton>
              <IonIcon icon={personAddOutline} color='tertiary' className='font25' />
            </IonButton>
          </Link>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol className='contact-list ion-margin'>
              {/* Single Person Contact Component */}
              <ContactItem />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
