import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Getting Started',
    img: require('@site/static/img/ed-fi-chalkboard.png').default,
    description: (
      <>
        Patterns and practices for starting or expanding on your Ed-Fi journey.
      </>
    ),
    href: '/getting-started',
  },
  {
    title: 'Partners',
    img: require('@site/static/img/ed-fi-puzzle.png').default,
    description: (
      <>
        Find a certified partner or learn how to earn Ed-Fi badges and
        certification.
      </>
    ),
    href: '/partners',
  },
  {
    title: 'Community',
    img: require('@site/static/img/ed-fi-exclaim-question.png').default,
    description: (
      <>
        Connect with the Ed-Fi help desk or with the Ed-Fi community for expert
        support.
      </>
    ),
    href: '/community',
  },
  {
    title: 'Reference',
    img: require('@site/static/img/ed-fi-phone-graphic.png').default,
    description: (
      <>
        Reference documentation for the Ed-Fi Data Standard and Ed-Fi technology
        suite.
      </>
    ),
    href: '/reference',
  },
];
//text--center
function Feature({ img, title, description, href }) {
  return (
    <div className="col">
      <div className={`shadow--md text--center ${styles.featureBlock}`}>
        <img src={img} className={`${styles.featureImg}`} alt={title} />
      </div>
      <div className="padding-horiz--md margin-bottom--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={href} class="button button--primary">
          Read more »
        </a>
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
