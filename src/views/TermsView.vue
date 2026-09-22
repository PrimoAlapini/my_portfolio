<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Hero -->
    <div class="bg-[#33663b] text-white pt-32 pb-14 px-6 md:px-12 relative overflow-hidden">
      <div class="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none"></div>
      <div class="relative max-w-3xl mx-auto">
        <p class="text-[#F4B400] text-xs font-semibold tracking-widest uppercase mb-3">Légal</p>
        <h1 class="text-3xl md:text-4xl font-bold mb-3">Termes et Conditions</h1>
        <p class="text-white/60 text-sm">Dernière mise à jour : Septembre 2026</p>
      </div>
    </div>

    <!-- Contenu -->
    <div class="max-w-3xl mx-auto px-6 md:px-12 py-14 space-y-10">

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">1. Acceptation des conditions</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          En accédant à ce site web et en utilisant les services proposés par Primous Alapini (« The Rezah »), vous acceptez pleinement et sans réserve les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">2. Description des services</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          Ce portfolio présente les compétences, projets et services de développement web et mobile proposés par The Rezah. Les services comprennent notamment : la création de sites web, le développement d'applications web et mobiles, la conception graphique (logo, flyer, affiche), la sécurité web, la maintenance et l'accompagnement technique.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">3. Propriété intellectuelle</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          Tout le contenu présent sur ce site (textes, images, logos, code source, design) est la propriété exclusive de Primous Alapini, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.
        </p>
        <p class="text-gray-600 leading-relaxed text-sm mt-3">
          Les projets présentés dans le portfolio ont été réalisés dans le cadre de collaborations professionnelles. Les droits relatifs à ces projets appartiennent à leurs commanditaires respectifs.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">4. Limitation de responsabilité</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          The Rezah s'efforce de maintenir ce site à jour et sans erreur. Cependant, aucune garantie n'est donnée quant à l'exactitude, l'exhaustivité ou la disponibilité permanente du contenu. En aucun cas, The Rezah ne pourra être tenu responsable de dommages directs ou indirects résultant de l'utilisation de ce site.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">5. Liens externes</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          Ce site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre informatif uniquement. The Rezah n'est pas responsable du contenu ou des pratiques de confidentialité de ces sites externes.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">6. Modifications</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          The Rezah se réserve le droit de modifier les présentes conditions à tout moment. Les modifications prennent effet dès leur publication sur cette page. Il est de votre responsabilité de consulter régulièrement cette page.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">7. Droit applicable</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          Les présentes conditions sont régies par le droit béninois. Tout litige relatif à leur interprétation ou exécution sera soumis à la compétence des tribunaux de Cotonou, Bénin.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-[#33663b] mb-3">8. Contact</h2>
        <p class="text-gray-600 leading-relaxed text-sm">
          Pour toute question relative aux présentes conditions, contactez-nous à :
          <a href="mailto:therezahdev@gmail.com" class="text-[#33663b] font-semibold hover:underline ml-1">therezahdev@gmail.com</a>
        </p>
      </section>

      <!-- Retour -->
      <div class="pt-4 border-t border-gray-200 flex flex-wrap gap-4">
        <router-link to="/" class="text-sm text-[#33663b] font-semibold hover:underline">← Retour à l'accueil</router-link>
        <router-link to="/privacy" class="text-sm text-gray-400 hover:text-[#33663b] transition">Politique de confidentialité →</router-link>
      </div>
    </div>
  </div>
</template>
