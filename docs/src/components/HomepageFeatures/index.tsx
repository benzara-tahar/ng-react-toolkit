import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Modern State Management",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Seamlessly integrate Zustand stores with AngularJS using the{" "}
        <code>@ConnectStore</code> decorator. Enjoy modern, predictable state
        management while maintaining compatibility with AngularJS's digest
        cycle.
      </>
    ),
  },
  {
    title: "Type-Safe Dependency Injection",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Replace verbose AngularJS dependency injection with the modern{" "}
        <code>@Inject</code> decorator. Get compile-time validation and improved
        maintainability with TypeScript support.
      </>
    ),
  },
  {
    title: "React Integration",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Access AngularJS services in React components with{" "}
        <code>useNgServices</code> hook. Gradually migrate your application
        while maintaining access to existing business logic.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function AdditionalFeature({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className="padding-vert--md">{description}</p>
        <ul className={styles.featureList}>
          {items.map((item, idx) => (
            <li key={idx} className={styles.featureItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
