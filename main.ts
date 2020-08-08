import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';

// imported constructs
import { WebService } from './lib/web-service';

// export class MyChart extends Chart {
//   constructor(scope: Construct, name: string) {
//     super(scope, name);

//     // define resources here
    
//     const label = { app: 'hello-k8s' };

//     new Service(this, 'service', {
//       spec: {
//         type: 'LoadBalancer',
//         ports: [ { port: 80, targetPort: IntOrString.fromNumber(8080) } ],
//         selector: label
//       }
//     });

//     new Deployment(this, 'deployment', {
//       spec: {
//         replicas: 2,
//         selector: {
//           matchLabels: label
//         },
//         template: {
//           metadata: { labels: label },
//           spec: {
//             containers: [
//               {
//                 name: 'hello-kubernetes',
//                 image: 'paulbouwer/hello-kubernetes:1.7',
//                 ports: [ { containerPort: 8080 } ]
//               }
//             ]
//           }
//         }
//       }
//     });

//   }
// }

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    new WebService(this, 'hello', { image: 'paulbouwer/hello-kubernetes:1.7', replicas: 2 });
    new WebService(this, 'ghost', { image: 'ghost', containerPort: 2368 });
  }
}

const app = new App();
new MyChart(app, 'cdk8s-helloworld');
app.synth();
