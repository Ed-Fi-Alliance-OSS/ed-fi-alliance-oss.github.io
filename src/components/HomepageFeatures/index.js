import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Developer Blog',
    img: require('@site/static/img/ed-fi-exclaim-question.png').default,
    description: (
      <>
        Announcements and technical articles from the Ed-Fi Alliance Tech Team.
      </>
    ),
  },
  {
    title: 'Data Exchange Standards',
    img: require('@site/static/img/ed-fi-puzzle.png').default,
    description: (
      <>
        All about the Ed-Fi Data Standard and REST-based Ed-Fi APIs specifications.
      </>
    ),
  },
  {
    title: 'Ed-Fi Software',
    img: require('@site/static/img/ed-fi-chalkboard.png').default,
    description: (
      <>
        Learn about the Ed-Fi Alliance's software, including the Ed-Fi ODS/API Platform,
        Admin API, API Publisher, MetaEd, and other tools.
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} className="feature-img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
