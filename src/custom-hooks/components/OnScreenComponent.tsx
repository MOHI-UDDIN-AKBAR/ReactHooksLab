import { useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';

const OnScreenComponent = () => {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { isVisible } = useOnScreen(paragraphRef, '-100px');
  return (
    <div className="on-screen-container">
      <div className="passage">
        <h1 className="title">First Paragraph</h1>
        <p className="paragraph">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          quaerat deserunt voluptate asperiores vel ea? Reprehenderit itaque
          ipsum, fuga nihil debitis voluptas dolore corporis delectus obcaecati
          error odit deserunt enim accusantium, odio iste dolor optio quos!
          Reiciendis, est excepturi tenetur nostrum dolore, molestiae iste
          accusantium deleniti perferendis sapiente tempora soluta iure atque
          obcaecati amet eius, illum aut incidunt aliquid animi quis cumque
          explicabo? Vero illum ea dignissimos vitae maiores, exercitationem
          quasi obcaecati nihil? Fugiat ab minima eum nobis quia, suscipit enim
          officiis dolore pariatur esse eligendi quis veniam voluptatum ducimus
          dolorem saepe numquam animi a voluptatibus excepturi accusamus
          sapiente hic. Temporibus recusandae porro ex qui commodi unde facere
          quibusdam eos laudantium? Vitae quibusdam quis cum, adipisci
          architecto excepturi temporibus odit officia at porro voluptatem
          cupiditate, reprehenderit nobis nam earum? Maiores nostrum nemo,
          dolorem officiis reiciendis earum, harum veniam nisi cumque recusandae
          ad sunt itaque. Facilis, quisquam? Animi officia enim nesciunt aliquid
          voluptate voluptatum aut ratione labore nemo deleniti eos beatae
          veniam nam, odio aliquam ab, vel quis? Voluptatum est porro dolor
          possimus consectetur, molestiae eos consequuntur. Qui, animi tenetur
          sunt mollitia ipsum inventore distinctio quasi. Quibusdam ab, delectus
          perspiciatis voluptatem molestias laborum cupiditate totam temporibus,
          optio animi consectetur porro ipsum nesciunt. Omnis libero, rem
          corrupti ad impedit voluptates distinctio, a aperiam perspiciatis
          exercitationem quibusdam! Deserunt modi facilis explicabo tempore, sed
          commodi consequuntur veniam eaque dignissimos. Libero voluptas alias
          deleniti nulla sunt nam fugiat odio totam autem, modi tempora nesciunt
          molestias ipsa nihil vitae quos officiis nostrum iste velit quisquam
          eius nisi voluptate! Ad error amet dolor quaerat, minima voluptas eius
          facere laudantium accusamus sunt unde eaque libero quis atque cum odit
          explicabo quasi, voluptatibus quas ea. Mollitia cum aperiam beatae ab,
          inventore saepe ullam! Ea debitis incidunt sunt soluta rerum tempora
          rem, blanditiis maxime quam sed facilis alias. Minus ut eius a quas
          soluta dignissimos tempore repellat dicta quia, itaque aspernatur sed
          earum mollitia, commodi deleniti error nesciunt harum perferendis
          ducimus cupiditate. Laudantium veniam ad illo inventore dolores!
          Tempore, repellat fugiat et, esse, sint quos illum incidunt
          consequatur perspiciatis id alias sunt vel eos nisi molestias quidem
          tenetur sit necessitatibus ab fuga nihil quaerat error commodi!
          Dignissimos optio exercitationem tempore a assumenda totam pariatur
          facere voluptates corporis molestiae error, praesentium nihil quidem
          cumque unde eveniet at incidunt nisi dolores! Similique possimus
          incidunt error illum accusantium in nihil asperiores tempora cum,
          tenetur assumenda odio recusandae temporibus iste porro cumque a
          minima sequi corrupti ab? Tenetur cumque iusto doloribus ex nihil
          architecto, ad, deleniti nulla obcaecati id perspiciatis veritatis
          soluta, culpa pariatur fugit? Sunt blanditiis fugit aliquid saepe
          exercitationem maxime temporibus delectus officia. Saepe incidunt
          iusto omnis, dolore in architecto maxime officiis sunt autem, iure
          recusandae, minima a velit fugiat doloribus possimus veniam
          consequatur optio accusamus consectetur nesciunt cupiditate unde
          eaque! Dolorum necessitatibus alias voluptatem nihil culpa tempora
          sequi molestiae, eius perspiciatis ratione impedit officia fuga magnam
          cupiditate assumenda vitae. Ad aliquam vitae ab. Explicabo, tempora
          consequatur fugiat libero cumque beatae dicta, doloribus nulla
          suscipit voluptates accusantium officiis! Autem doloribus dolore
          inventore fuga? Earum, aperiam, quaerat similique impedit quasi ullam
          excepturi omnis nostrum non eum, expedita incidunt dolores optio
          accusamus iure voluptas fugiat sed culpa rem id rerum nam ratione
          officia? Quasi, magnam ducimus perferendis error mollitia repudiandae
          aspernatur aperiam qui laborum hic. Ipsa minima cumque pariatur odit,
          corporis aspernatur voluptatibus molestiae architecto error ad eaque
          praesentium labore quaerat exercitationem quasi placeat nulla facere
          tempora, dolor delectus. Aliquam, illum sequi molestiae, at porro ab
          animi repellat cum accusantium, vel quidem neque sint quo dolor
          necessitatibus adipisci cupiditate dicta reprehenderit sed quaerat
          natus. Quia expedita dolor nostrum magni ea voluptatum debitis
          corporis unde saepe voluptate. Repellendus facilis laboriosam ut
          soluta beatae molestias animi placeat sint voluptatem tempore harum et
          numquam rem eaque, a maiores cumque blanditiis velit! Dolorum quo
          expedita voluptatem eveniet illum excepturi amet, soluta, unde saepe
          ipsam eaque enim officiis illo reprehenderit doloribus non cum autem
          ipsa similique nam inventore magni! Excepturi, velit sit! Aut, qui quo
          incidunt, ab ratione adipisci dolorum ducimus laboriosam ullam optio
          magni eligendi commodi officiis deleniti. Libero earum, odit tenetur
          veniam fugiat, fuga rem velit nostrum vel enim minus eveniet illum
          quod tempore doloremque a sed id placeat, nam ullam! Itaque
          repellendus neque iure fuga delectus quos doloribus quidem debitis
          voluptatem, quo omnis pariatur possimus animi. Voluptatibus architecto
          molestias voluptatem rerum labore harum mollitia obcaecati
          praesentium, earum atque eius cupiditate quisquam debitis excepturi
          commodi repellat accusamus? Nam placeat commodi recusandae. Dolores
          quod rerum exercitationem quo saepe eum accusamus impedit! Provident,
          temporibus voluptatem! Eum quod doloribus a sit sed reprehenderit
          eligendi, architecto iusto magnam! Reiciendis consequatur quia quidem
          optio quasi aliquam magni dolorum earum, eveniet accusantium, mollitia
          ex eum deleniti eos facere iusto iure autem impedit cupiditate id.
          Recusandae quis ipsa non fugiat consequuntur. Quia ipsum non tenetur
          cumque, hic necessitatibus doloremque quo molestias distinctio.
          Ducimus expedita sit earum rerum pariatur quo veritatis. Illo sint
          inventore, ducimus ipsa quo, aliquid nesciunt similique voluptatum aut
          dolorum fugiat. Debitis ratione sit porro optio, sequi recusandae
          ipsam numquam nesciunt. Quam doloribus mollitia laborum? Harum alias
          dolore natus doloremque consectetur cumque ullam aliquid et cum ipsa
          pariatur sapiente porro, officia iste corporis est? Commodi beatae
          aliquid quidem veritatis earum. Veritatis deserunt dolorum ab delectus
          possimus doloremque natus, sint consequuntur nihil et voluptatum ipsum
          ex laborum molestias cupiditate voluptates quasi sit dolor nobis
          quibusdam officia nostrum harum adipisci. Excepturi, cum magnam?
          Ullam, exercitationem? Consequatur consequuntur vitae nemo magni quos,
          possimus quam ut quibusdam labore odit, ipsam voluptas molestiae
          minima voluptate quasi, nobis quia veritatis? Accusantium vel, maiores
          molestias ut inventore explicabo quis, doloremque qui, perspiciatis
          consectetur similique cupiditate vero! Doloribus molestiae sit dolor
          reiciendis, quisquam molestias, error natus, atque voluptates
          explicabo unde tempore. Eum vitae repellendus suscipit quibusdam
          labore impedit unde architecto sit hic libero voluptas, qui
          consectetur fugiat magnam soluta minus ratione maxime quia omnis earum
          deserunt. Culpa blanditiis assumenda ad id aperiam quidem, alias,
          sapiente quisquam minima dolore corrupti saepe? Dolor optio culpa
          autem ipsam asperiores facilis iste repellendus recusandae! A
          praesentium animi autem amet cum odio culpa quam veniam.
        </p>
      </div>
      <div className="passage">
        <h1 className="title">
          Second <span ref={paragraphRef}>{isVisible && 'Paragraph'}</span>
        </h1>
        <p className="paragraph">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
          quaerat deserunt voluptate asperiores vel ea? Reprehenderit itaque
          ipsum, fuga nihil debitis voluptas dolore corporis delectus obcaecati
          error odit deserunt enim accusantium, odio iste dolor optio quos!
          Reiciendis, est excepturi tenetur nostrum dolore, molestiae iste
          accusantium deleniti perferendis sapiente tempora soluta iure atque
          obcaecati amet eius, illum aut incidunt aliquid animi quis cumque
          explicabo? Vero illum ea dignissimos vitae maiores, exercitationem
          quasi obcaecati nihil? Fugiat ab minima eum nobis quia, suscipit enim
          officiis dolore pariatur esse eligendi quis veniam voluptatum ducimus
          dolorem saepe numquam animi a voluptatibus excepturi accusamus
          sapiente hic. Temporibus recusandae porro ex qui commodi unde facere
          quibusdam eos laudantium? Vitae quibusdam quis cum, adipisci
          architecto excepturi temporibus odit officia at porro voluptatem
          cupiditate, reprehenderit nobis nam earum? Maiores nostrum nemo,
          dolorem officiis reiciendis earum, harum veniam nisi cumque recusandae
          ad sunt itaque. Facilis, quisquam? Animi officia enim nesciunt aliquid
          voluptate voluptatum aut ratione labore nemo deleniti eos beatae
          veniam nam, odio aliquam ab, vel quis? Voluptatum est porro dolor
          possimus consectetur, molestiae eos consequuntur. Qui, animi tenetur
          sunt mollitia ipsum inventore distinctio quasi. Quibusdam ab, delectus
          perspiciatis voluptatem molestias laborum cupiditate totam temporibus,
          optio animi consectetur porro ipsum nesciunt. Omnis libero, rem
          corrupti ad impedit voluptates distinctio, a aperiam perspiciatis
          exercitationem quibusdam! Deserunt modi facilis explicabo tempore, sed
          commodi consequuntur veniam eaque dignissimos. Libero voluptas alias
          deleniti nulla sunt nam fugiat odio totam autem, modi tempora nesciunt
          molestias ipsa nihil vitae quos officiis nostrum iste velit quisquam
          eius nisi voluptate! Ad error amet dolor quaerat, minima voluptas eius
          facere laudantium accusamus sunt unde eaque libero quis atque cum odit
          explicabo quasi, voluptatibus quas ea. Mollitia cum aperiam beatae ab,
          inventore saepe ullam! Ea debitis incidunt sunt soluta rerum tempora
          rem, blanditiis maxime quam sed facilis alias. Minus ut eius a quas
          soluta dignissimos tempore repellat dicta quia, itaque aspernatur sed
          earum mollitia, commodi deleniti error nesciunt harum perferendis
          ducimus cupiditate. Laudantium veniam ad illo inventore dolores!
          Tempore, repellat fugiat et, esse, sint quos illum incidunt
          consequatur perspiciatis id alias sunt vel eos nisi molestias quidem
          tenetur sit necessitatibus ab fuga nihil quaerat error commodi!
          Dignissimos optio exercitationem tempore a assumenda totam pariatur
          facere voluptates corporis molestiae error, praesentium nihil quidem
          cumque unde eveniet at incidunt nisi dolores! Similique possimus
          incidunt error illum accusantium in nihil asperiores tempora cum,
          tenetur assumenda odio recusandae temporibus iste porro cumque a
          minima sequi corrupti ab? Tenetur cumque iusto doloribus ex nihil
          architecto, ad, deleniti nulla obcaecati id perspiciatis veritatis
          soluta, culpa pariatur fugit? Sunt blanditiis fugit aliquid saepe
          exercitationem maxime temporibus delectus officia. Saepe incidunt
          iusto omnis, dolore in architecto maxime officiis sunt autem, iure
          recusandae, minima a velit fugiat doloribus possimus veniam
          consequatur optio accusamus consectetur nesciunt cupiditate unde
          eaque! Dolorum necessitatibus alias voluptatem nihil culpa tempora
          sequi molestiae, eius perspiciatis ratione impedit officia fuga magnam
          cupiditate assumenda vitae. Ad aliquam vitae ab. Explicabo, tempora
          consequatur fugiat libero cumque beatae dicta, doloribus nulla
          suscipit voluptates accusantium officiis! Autem doloribus dolore
          inventore fuga? Earum, aperiam, quaerat similique impedit quasi ullam
          excepturi omnis nostrum non eum, expedita incidunt dolores optio
          accusamus iure voluptas fugiat sed culpa rem id rerum nam ratione
          officia? Quasi, magnam ducimus perferendis error mollitia repudiandae
          aspernatur aperiam qui laborum hic. Ipsa minima cumque pariatur odit,
          corporis aspernatur voluptatibus molestiae architecto error ad eaque
          praesentium labore quaerat exercitationem quasi placeat nulla facere
          tempora, dolor delectus. Aliquam, illum sequi molestiae, at porro ab
          animi repellat cum accusantium, vel quidem neque sint quo dolor
          necessitatibus adipisci cupiditate dicta reprehenderit sed quaerat
          natus. Quia expedita dolor nostrum magni ea voluptatum debitis
          corporis unde saepe voluptate. Repellendus facilis laboriosam ut
          soluta beatae molestias animi placeat sint voluptatem tempore harum et
          numquam rem eaque, a maiores cumque blanditiis velit! Dolorum quo
          expedita voluptatem eveniet illum excepturi amet, soluta, unde saepe
          ipsam eaque enim officiis illo reprehenderit doloribus non cum autem
          ipsa similique nam inventore magni! Excepturi, velit sit! Aut, qui quo
          incidunt, ab ratione adipisci dolorum ducimus laboriosam ullam optio
          magni eligendi commodi officiis deleniti. Libero earum, odit tenetur
          veniam fugiat, fuga rem velit nostrum vel enim minus eveniet illum
          quod tempore doloremque a sed id placeat, nam ullam! Itaque
          repellendus neque iure fuga delectus quos doloribus quidem debitis
          voluptatem, quo omnis pariatur possimus animi. Voluptatibus architecto
          molestias voluptatem rerum labore harum mollitia obcaecati
          praesentium, earum atque eius cupiditate quisquam debitis excepturi
          commodi repellat accusamus? Nam placeat commodi recusandae. Dolores
          quod rerum exercitationem quo saepe eum accusamus impedit! Provident,
          temporibus voluptatem! Eum quod doloribus a sit sed reprehenderit
          eligendi, architecto iusto magnam! Reiciendis consequatur quia quidem
          optio quasi aliquam magni dolorum earum, eveniet accusantium, mollitia
          ex eum deleniti eos facere iusto iure autem impedit cupiditate id.
          Recusandae quis ipsa non fugiat consequuntur. Quia ipsum non tenetur
          cumque, hic necessitatibus doloremque quo molestias distinctio.
          Ducimus expedita sit earum rerum pariatur quo veritatis. Illo sint
          inventore, ducimus ipsa quo, aliquid nesciunt similique voluptatum aut
          dolorum fugiat. Debitis ratione sit porro optio, sequi recusandae
          ipsam numquam nesciunt. Quam doloribus mollitia laborum? Harum alias
          dolore natus doloremque consectetur cumque ullam aliquid et cum ipsa
          pariatur sapiente porro, officia iste corporis est? Commodi beatae
          aliquid quidem veritatis earum. Veritatis deserunt dolorum ab delectus
          possimus doloremque natus, sint consequuntur nihil et voluptatum ipsum
          ex laborum molestias cupiditate voluptates quasi sit dolor nobis
          quibusdam officia nostrum harum adipisci. Excepturi, cum magnam?
          Ullam, exercitationem? Consequatur consequuntur vitae nemo magni quos,
          possimus quam ut quibusdam labore odit, ipsam voluptas molestiae
          minima voluptate quasi, nobis quia veritatis? Accusantium vel, maiores
          molestias ut inventore explicabo quis, doloremque qui, perspiciatis
          consectetur similique cupiditate vero! Doloribus molestiae sit dolor
          reiciendis, quisquam molestias, error natus, atque voluptates
          explicabo unde tempore. Eum vitae repellendus suscipit quibusdam
          labore impedit unde architecto sit hic libero voluptas, qui
          consectetur fugiat magnam soluta minus ratione maxime quia omnis earum
          deserunt. Culpa blanditiis assumenda ad id aperiam quidem, alias,
          sapiente quisquam minima dolore corrupti saepe? Dolor optio culpa
          autem ipsam asperiores facilis iste repellendus recusandae! A
          praesentium animi autem amet cum odio culpa quam veniam.
        </p>
      </div>
    </div>
  );
};

export default OnScreenComponent;
