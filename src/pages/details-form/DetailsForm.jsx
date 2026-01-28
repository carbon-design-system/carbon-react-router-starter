/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid, Column, TextInput, Toggle, Button } from '@carbon/react';
import { useState } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { Footer } from '../../components/footer/Footer';

const DetailsForm = () => {
  const [name, setName] = useState('');
  const [marketing, setMarketing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, marketing });
    // Handle form submission logic here
  };

  return (
    <PageLayout
      className="cs--details-form"
      fallback={<p>Loading details form...</p>}
    >
      <div className="details-form-page">
        <Grid>
          <Column sm={4} md={6} lg={10}>
            <div className="details-form-container">
              <div className="cat-illustration" aria-hidden="true">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="40"
                    cy="45"
                    r="25"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="33" cy="42" r="2" fill="currentColor" />
                  <circle cx="47" cy="42" r="2" fill="currentColor" />
                  <path
                    d="M 35 50 Q 40 52 45 50"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line
                    x1="50"
                    y1="45"
                    x2="65"
                    y2="43"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="50"
                    y1="48"
                    x2="65"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="50"
                    y1="51"
                    x2="65"
                    y2="57"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="30"
                    y1="45"
                    x2="15"
                    y2="43"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="30"
                    y1="48"
                    x2="15"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="30"
                    y1="51"
                    x2="15"
                    y2="57"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 25 25 L 30 15 L 35 25"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 55 25 L 50 15 L 45 25"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              <h1 className="form-title">Enter your details</h1>

              <form onSubmit={handleSubmit}>
                <Grid>
                  <Column sm={4} md={6} lg={10}>
                    <TextInput
                      id="name-input"
                      labelText="Name:"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Column>

                  <Column sm={4} md={6} lg={10}>
                    <Toggle
                      id="marketing-toggle"
                      labelText="Marketing"
                      toggled={marketing}
                      onToggle={(checked) => setMarketing(checked)}
                    />
                  </Column>

                  <Column sm={4} md={3} lg={4}>
                    <Button type="submit">Submit</Button>
                  </Column>
                </Grid>
              </form>
            </div>
          </Column>
        </Grid>
      </div>

      <Footer />
    </PageLayout>
  );
};

export default DetailsForm;
