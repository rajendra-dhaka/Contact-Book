import { IonIcon, IonAccordion, IonAccordionGroup, IonAvatar, IonItem, IonLabel } from '@ionic/react';

import { createOutline, eyeOutline, logoWhatsapp, trashOutline } from 'ionicons/icons';

import { Link } from 'react-router-dom';

import './ContactItem.scss';

interface ContainerProps { people:any[]}

export const ContactItem: React.FC<ContainerProps> = ({people}) => {
console.log('people id', people )

  return (
    <IonAccordionGroup >
      {/* Accordion Start */}
     { people && people.map((person:any)=><IonAccordion value={person.id} key={person.id}>
        <IonItem slot="header" color="light">
          <IonAvatar className="ion-margin">
            <img alt="profile" src={person.img} />
          </IonAvatar >
         <IonLabel>{person.name}</IonLabel>
        </IonItem>
        <div className="ion-padding cta" slot="content">
          <IonIcon icon={logoWhatsapp}></IonIcon>
         <Link to={`view/${person.id}`}>
            <IonIcon icon={eyeOutline}></IonIcon>
          </Link>
          <Link to={`upsert/${person.id}`}>
            <IonIcon icon={createOutline}></IonIcon>
          </Link>
          <IonIcon icon={trashOutline}></IonIcon>
        </div>
      </IonAccordion>)}
      {/* Accordion Ends here */}
      
    </IonAccordionGroup>

  );
};


