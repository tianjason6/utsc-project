import React, { Component } from "react";
import LongInfo from "../LongInfo/LongInfo";
import styles from "./About.module.css";
import { connect } from "react-redux";

class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const header = "About Us";
    const info = `Entrepreneurship is the dynamic process of creating incremental wealth and innovating things of value that have a bearing on the welfare of an entrepreneur.

    It provides civilization with an enormous amount of goods and services and enhances the growth of social welfare.
    
    The main importance of entrepreneurship is the creation of job opportunities, innovation, and improve the economy.
    
    The man behind the entrepreneurship is an action-oriented and highly motivated individual who is ready to achieve goals.
    
    M. Kirzner (1973) observes entrepreneurs as; “one who perceives what others have not seen and acts upon that perception”.
    
    Thus, entrepreneurs take the economy and the society that is the whole civilization to the state of progress and prosperity.
    
    Taking this into consideration we can describe the significance or importance of entrepreneurship which is stated below.
    9 importance of entrepreneurship are;
    
    Growth of Entrepreneurship.
    Creation of job opportunities.
    Innovation.
    Impact on community development.
    The consequence of business failure.
    Political and economic integration of outsiders.
    Spawns entrepreneurship.
    Enhances the standard of living.
    Promotes research and development.
    1. Growth of Entrepreneurship
    Entrepreneurship the advent of new venture particularly small ventures to materialize the innovative ideas of the entrepreneurs.
    
    Thus, the growth or establishment of small enterprises ii the specific contribution of entrepreneurship in every economy of the world.
    
    The statistics reveal that in USA economy nearly half a million small enterprise is established every year. Our country is not an exception in this regard.
    2. Creation of job opportunities
    Entrepreneurship firms contributed a large share of new jobs. It provides entry-level jobs so necessary fur training or gaining experience for unskilled workers.
    
    The small enterprises are the only sector that generates a large portion of total employment every year.
    
    Moreover, entrepreneurial ventures prepare and supply experienced labor to large industries.
    
    3. Innovation
    Entrepreneurship is the incubator of innovation. Innovation creates disequilibria in the present state of order.
    
    It goes beyond discovery and does implementation and commercialization, of innovations.
    “Leapfrog” innovation, research, and development are being contributed by entrepreneurship.
    
    Thus, entrepreneurship nurses innovation that provides new ventures, products, technology, market, quality of good, etc. to the economy that increases Gross Domestic Products and standard of living of the people.
    
    4. Impact on community development
    A community is better off if its employment base is diversified among many small entrepreneurial firms.
    
    It promotes abundant retail facilities, a higher level of homeownership, fewer slums, better, sanitation standards and higher expenditure on education, recreation, and religious activities.
    
    Thus, entrepreneurship leads to more stability and a higher quality of community life.
    
    5. The consequence of business failure
    The collapse of the large industry almost has irresistible damage to the development of the state and the state of the economy and the financial condition of the relevant persons.
    
    The incumbents lost their jobs: suppliers and financial institutions face a crisis of recovery.
    
    Customers are deprived of goods, services, and government losses taxes. This could not happen in the case of failure of entrepreneurship.
    
    There shall be no measurable effect upon the economy and no political repercussions too.
    
    6. Political and economic integration of outsiders
    Entrepreneurship is the most effective way of integrating those who feel disposed of and alienated into the economy.
    Minorities, migrants, and women are safely integrated into entrepreneurship that will help to develop a well-composed plural society.
    
    7. Spawns entrepreneurship
    Entrepreneurship is the nursing ground for new inexperienced adventurists.
    
    It is the field where a person can start his/her idea of the venture, which may be ended up in a giant enterprise. All the large industrial ventures started as a small entrepreneurial enterprise.
    
    Therefore, entrepreneurship provides a wide spectrum of ventures and entrepreneurs in every economy. The vast open arena of entrepreneurship thus acts as an incubator to entrepreneurs.
    
    8. Enhances the standard of living
    The standard of living is a concept built on an increase in the amount of consumption of a variety of goods and services over a particular period by a household.
    
    So it depends on the availability of diversified products in the market. Entrepreneurship provides enormous kinds of a product of various natures by their innovation.
    
    Besides, it increases the income of the people who are employed in entrepreneurial enterprises.
    
    That also capable employed persons to consume more goods and services. In effect, entrepreneurship enhances the standard of living of the people of a country.
    
    9. Promotes research and development
    Entrepreneurship is innovation and hence the innovated ideas of goods and services have to be tested by experimentation.
    
    Therefore, entrepreneurship provides funds for research and development with universities and research institutions. This promotes the general development, research, and development in the economy.
    
    Entrepreneurship is the pioneering zeal that provides events in our civilization.
    
    We are indebted to it for having prosperity in every arena of human life- economic, technological and cultural.
    
    The above discussion, in a nutshell, enumerates that tremendous’ contributions of entrepreneurship.`;

    return (
      <div className={styles.Content}>
        <LongInfo header={header} text={info} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(About);
