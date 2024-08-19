import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Get Started',
    img: require('@site/static/img/ed-fi-exclaim-question.png').default,
    description: (
      <>
        Implementation playbooks and certified partner information for those
        starting on their Ed-Fi journey or looking to expand into new use cases.
      </>
    ),
    href: '/get-started',
  },
  {
    title: 'Reference',
    img: require('@site/static/img/ed-fi-puzzle.png').default,
    description: (
      <>
        Reference documentation for the Ed-Fi Data Standard and the Ed-Fi
        Alliance's technology suite, including the Ed-Fi ODS/API and other tools.
      </>
    ),
    href: '/reference',
  },
  {
    title: 'Support',
    img: require('@site/static/img/ed-fi-chalkboard.png').default,
    description: (
      <>
        Connect with the Ed-Fi help desk or with the Ed-Fi community at large for expert
        support and to contribute to the growing suite of Ed-Fi aligned software.
      </>
    ),
    href: '/support',
  },
];
//text--center
function Feature({img, title, description, href}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={`shadow--md text--center ${styles.featureBlock}`}>
        <img src={img} className={`${styles.featureImg}`} alt={title} />
      </div>
      <div className="padding-horiz--md margin-bottom--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={href} class="button button--primary">Read more »</a>
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
