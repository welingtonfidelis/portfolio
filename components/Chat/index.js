import { Helmet } from 'react-helmet';

export default function Chat() {
  const replainId = process.env.REACT_APP_REPLAIN_ID;

  return (
    <Helmet>
      <script type="text/javascript">
        {`
         window.replainSettings = { id: '${replainId}' };
         (function (u) {
           var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = u;
           var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
          })('https://widget.replain.cc/dist/client.js');
        `}
      </script>
    </Helmet>
  )
}