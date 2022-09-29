import styles from "./HowToUse.module.scss";
import Head from "next/head";
import { useState } from "react";

const HowToUse = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <>
      <Head>
        <title>Coinbet Play - How to use</title>
        <meta name="description" content="How to use description" />
      </Head>
      <div className={styles["how-to-use-wrapper"]}>
        <div className="container">
          <div className={styles["grid-container"]}>
            <div className={styles["tabs"]}>
              <h3
                className={selectedTabIndex === 0 ? styles["active"] : ""}
                onClick={() => setSelectedTabIndex(0)}
              >
                Info for rewards providers
              </h3>
              <h3
                className={selectedTabIndex === 1 ? styles["active"] : ""}
                onClick={() => setSelectedTabIndex(1)}
              >
                Info for players
              </h3>
            </div>
            <div className={styles["tab-content"]}>
              {selectedTabIndex === 0 ? (
                <div className={styles["wrapper"]}>
                  <div>
                    <h3>Et integer vitae sodales</h3>
                    <p>
                      Enim, tellus magnis sagittis adipiscing placerat eget
                      pulvinar pulvinar. Quis bibendum venenatis amet urna,
                      aliquet leo. Et integer vitae sodales convallis sem
                      porttitor et felis. Condimentum mi eu enim tincidunt morbi
                      amet, magnis pretium. Ornare turpis erat posuere quisque
                      in amet, etiam leo, dignissim. Urna scelerisque nunc
                      ultricies elit. Et scelerisque eu fermentum aliquam, ac
                      placerat nunc eu. Aliquam interdum eu ornare convallis
                      ultrices lorem ut egestas purus. Nisi, pretium aliquam
                      magna turpis senectus metus interdum semper volutpat.
                    </p>
                  </div>
                  <div>
                    <h3>Orci non vitae imperdiet at</h3>
                    <p>
                      Urna, diam a in nec, id sed egestas. Proin cras tortor ac
                      in phasellus dis. Faucibus tellus amet iaculis ut a.
                      Semper pharetra ut nunc erat arcu fringilla tincidunt.
                      Facilisis ut augue dui pharetra condimentum ornare turpis
                      sit. Eros, vestibulum, mattis habitant urna. Et est
                      porttitor diam sed consequat sed. <br />
                      <br /> Sed risus, at ut magnis mauris, cras. Phasellus
                      nibh eu a mauris molestie nec consectetur vivamus tellus.
                      Viverra augue facilisis consectetur tincidunt. Interdum
                      leo sed eget purus netus. Cursus placerat ornare
                      vestibulum sed quis pharetra id auctor. Orci non vitae
                      imperdiet at. In habitant facilisis risus blandit sed
                      morbi cras blandit. Viverra vel sit quisque commodo.
                    </p>
                  </div>
                  <div>
                    <h3>Proin cras tortor ac in phasellus</h3>
                    <p>
                      Sed risus, at ut magnis mauris, cras. Phasellus nibh eu a
                      mauris molestie nec consectetur vivamus tellus. Viverra
                      augue facilisis consectetur tincidunt. Interdum leo sed
                      eget purus netus. Cursus placerat ornare vestibulum sed
                      quis pharetra id auctor. Orci non vitae imperdiet at. In
                      habitant facilisis risus blandit sed morbi cras blandit.
                      Viverra vel sit quisque commodo.
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles["wrapper"]}>
                  <div>
                    <h3>Info for players</h3>
                    <p>Info for players</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUse;
