import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSeoByRuta } from '../../services/seoService';

/**
 * Componente que se encarga de cargar el SEO para la ruta actual y
 * renderizar las etiquetas <title>, <meta>, <link>, y <script type="application/ld+json">.
 * Debe usarse dentro de un Layout que tenga acceso a la ruta actual.
 */
const SeoHelmet = ({ ruta }) => {
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getSeoByRuta(ruta)
      .then(data => {
        if (isMounted) {
          setSeo(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSeo(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [ruta]);

  // Mientras carga, no renderizamos nada (o un loading opcional)
  if (loading || !seo) {
    // Puedes devolver un Helmet con un título genérico mientras carga
    return (
      <Helmet>
        <title>CERTIMET</title>
      </Helmet>
    );
  }

  // Construir el tag robots
  const robotsContent = `${seo.indexar ? 'index' : 'noindex'}, ${seo.seguir_enlaces ? 'follow' : 'nofollow'}${seo.meta_robots_extra ? ', ' + seo.meta_robots_extra : ''}`;

  return (
    <Helmet>
      {/* Título */}
      <title>{seo.meta_titulo || 'CERTIMET'}</title>

      {/* Meta descripción */}
      {seo.meta_descripcion && (
        <meta name="description" content={seo.meta_descripcion} />
      )}

      {/* Robots */}
      <meta name="robots" content={robotsContent} />

      {/* Palabra clave (opcional) */}
      {seo.frase_clave && (
        <meta name="keywords" content={seo.frase_clave} />
      )}

      {/* URL canónica */}
      {seo.url_canonica && (
        <link rel="canonical" href={seo.url_canonica} />
      )}

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={seo.og_titulo || seo.meta_titulo || 'CERTIMET'} />
      {seo.og_descripcion && (
        <meta property="og:description" content={seo.og_descripcion || seo.meta_descripcion || ''} />
      )}
      {seo.og_imagen_url && (
        <meta property="og:image" content={seo.og_imagen_url} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo.twitter_card_tipo || 'summary_large_image'} />
      <meta name="twitter:title" content={seo.og_titulo || seo.meta_titulo || 'CERTIMET'} />
      {seo.og_descripcion && (
        <meta name="twitter:description" content={seo.og_descripcion || seo.meta_descripcion || ''} />
      )}
      {seo.og_imagen_url && (
        <meta name="twitter:image" content={seo.og_imagen_url} />
      )}

      {/* Schema JSON-LD */}
      {seo.schema_json && (
        <script type="application/ld+json">
          {JSON.stringify(seo.schema_json)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHelmet;